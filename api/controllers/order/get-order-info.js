module.exports = {
  friendlyName: "Get order info",

  description: "",

  inputs: {},

  exits: {},

  fn: async function (inputs,exits) {
    try {
      let { orderId } = this.req.query;
      if(!orderId){
        return exits.success({
          code : 1,
          message : "Vui lòng truyền orderId"
        })
      };
      let orderItemInfos = await OrderItem.find({
        orderId
      });
      let orderQuantity = {};
      orderItemInfos.map(e=>{
        orderQuantity[e.productId] = e.amount
      })
      let productIds = orderItemInfos.map(e=>e.productId)
      let productInfo = await Books.find({
        id : productIds
      });
      productInfo.map(e=>{
        e.amount = orderQuantity[e.id]
      })
      return exits.success({
        code : 0,
        data : productInfo,
        message : "Thành công"
      })
    } catch (error) {
      return exits.success({
        code : 1,
        message : "Hệ thống bận vui lòng thử lại sau"
      })
    }
  },
};
