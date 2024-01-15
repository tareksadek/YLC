import { getFirestoreInstance } from './firebase'

export const getOrders = async () => {
  let orders = []
  let orderData
  let ordersRes

  try {
    const db = await getFirestoreInstance()
    ordersRes = await db.collection('orders').orderBy('proccessedAt').get()
    ordersRes.forEach(order => {
      orderData = order.data()
      orderData.id = order.id
      orders = [...orders, orderData]
    })
  } catch (err) {
    throw new Error(err)
  }

  return orders
}

export const getOrderById = async orderId => {
  let orderData
  let orderRes

  try {
    const db = await getFirestoreInstance()
    orderRes = await db.collection('orders').doc(orderId).get()
    orderData = orderRes.data()
  } catch (err) {
    throw new Error(err)
  }

  return orderData
}

export const deleteOrderById = async orderId => {
  try {
    const db = await getFirestoreInstance()
    const order = await db.collection('orders').doc(orderId).get()
    if (order.exists) {
      await db.collection('orders').doc(orderId).delete()
    } else {
      console.log('order doesnt exist');
    }
    return true
  } catch (err) {
    console.log(err);
    throw new Error(err.message)
  }
}
