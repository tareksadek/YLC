import imageCompression from 'browser-image-compression'

const createImage = url => new Promise((resolve, reject) => {
  const image = new Image()
  image.addEventListener('load', () => resolve(image))
  image.addEventListener('error', error => reject(error))
  image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
  image.src = url
})

function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180
}

export function blobToFile(theBlob, fileName) {
  // A Blob() is almost a File() - it's just missing the two properties below which we will add
  const blob = theBlob
  blob.lastModifiedDate = new Date()
  blob.name = fileName
  return blob
}

// export async function getCroppedImg(imageSrc, pixelCrop, rotation = 0, type, returnValue) {
//   const image = await createImage(imageSrc)
//   const canvas = document.createElement('canvas')
//   const ctx = canvas.getContext('2d')

//   const maxSize = Math.max(image.width, image.height)
//   const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2))

//   // set each dimensions to double largest dimension to allow for a safe area for the
//   // image to rotate in without being clipped by canvas context
//   canvas.width = safeArea
//   canvas.height = safeArea

//   // translate canvas context to a central location on image to allow rotating around the center.
//   ctx.translate(safeArea / 2, safeArea / 2)
//   ctx.rotate(getRadianAngle(rotation))
//   ctx.translate(-safeArea / 2, -safeArea / 2)

//   // draw rotated image and store data.
//   ctx.drawImage(
//     image,
//     safeArea / 2 - image.width * 0.5,
//     safeArea / 2 - image.height * 0.5,
//   )
//   const data = ctx.getImageData(0, 0, safeArea, safeArea)

//   // set canvas width to final desired crop size - this will clear existing context
//   canvas.width = pixelCrop.width
//   canvas.height = pixelCrop.height

//   // paste generated rotate image with correct offsets for x,y crop values.
//   ctx.putImageData(
//     data,
//     Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
//     Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y),
//   )

//   if (returnValue === 'file') {
//     // As a blob
//     return new Promise(resolve => {
//       canvas.toBlob(file => {
//         resolve(URL.createObjectURL(file))
//       }, type)
//     })
//   }
//   return type === 'image/png' ? canvas.toDataURL() : canvas.toDataURL('image/jpeg')
// }

export async function getCroppedImg(imageSrc, pixelCrop, rotation = 0, type, returnValue, maxWidthHeight) {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  const maxSize = Math.max(image.width, image.height)
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2))

  // set each dimensions to double largest dimension to allow for a safe area for the
  // image to rotate in without being clipped by canvas context
  canvas.width = safeArea
  canvas.height = safeArea

  // translate canvas context to a central location on image to allow rotating around the center.
  ctx.translate(safeArea / 2, safeArea / 2)
  ctx.rotate(getRadianAngle(rotation))
  ctx.translate(-safeArea / 2, -safeArea / 2)

  // draw rotated image and store data.
  ctx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5,
  )
  const data = ctx.getImageData(0, 0, safeArea, safeArea)

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  // paste generated rotate image with correct offsets for x,y crop values.
  ctx.putImageData(
    data,
    Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
    Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y),
  )

  const croppedImageBlob = await new Promise(resolve => {
    canvas.toBlob(blob => {
      resolve(blob);
    }, type)
  })

  const compressionOptions = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: maxWidthHeight || 550,
    useWebWorker: true,
  }

  const compressedFile = await imageCompression(croppedImageBlob, compressionOptions)

  if (returnValue === 'file') {
    return URL.createObjectURL(compressedFile)
  }

  // if (returnValue === 'file') {
  //   // As a blob
  //   return new Promise(resolve => {
  //     canvas.toBlob(file => {
  //       resolve(URL.createObjectURL(file))
  //     }, type)
  //   })
  // }
  // return type === 'image/png' ? canvas.toDataURL() : canvas.toDataURL('image/jpeg')
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = event => {
      const dataUrl = event.target.result
      resolve(type === 'image/png' ? dataUrl : canvas.toDataURL('image/jpeg'))
    }
    reader.readAsDataURL(compressedFile)
  })
}

export async function getRotatedImage(imageSrc, rotation = 0) {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  const orientationChanged = rotation === 90 || rotation === -90 || rotation === 270 || rotation === -270
  if (orientationChanged) {
    canvas.width = image.height
    canvas.height = image.width
  } else {
    canvas.width = image.width
    canvas.height = image.height
  }

  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.rotate((rotation * Math.PI) / 180)
  ctx.drawImage(image, -image.width / 2, -image.height / 2)

  return new Promise(resolve => {
    canvas.toBlob(file => {
      resolve(URL.createObjectURL(file))
    }, 'image/png')
  })
}
