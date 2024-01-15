import { getFirestoreInstance } from './firebase'

export const getProducts = async () => {
  let products = []
  let productsData
  let productsRes

  try {
    const db = await getFirestoreInstance()
    productsRes = await db.collection('products').orderBy('invitations').get()
    productsRes.forEach(product => {
      productsData = product.data()
      productsData.id = product.id
      products = [...products, productsData]
    })
  } catch (err) {
    throw new Error(err)
  }

  return products
}
