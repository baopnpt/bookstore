module.exports = {
  friendlyName: "Create order",

  description: "",

  inputs: {
    receiveName: { type: "string", required: true },
    receivePhone: { type: "string", required: true },
    receiveEmail: { type: "string" },
    provinceId: { type: "number" },
    districtId: { type: "number" },
    wardId: { type: "number" },
    address: { type: "string" },
    methodPayment: {
      type: "string",
      //isIn: ['cod', 'online']
    },
    cart: {
      type: "json",
      required: true,
    },
    note : {type : "string"}
  },

  exits: {},

  fn: async function (inputs,exits) {
    try {
      let {
        receiveName,
        receivePhone,
        receiveEmail,
        provinceId,
        districtId,
        wardId,
        address,
        methodPayment,
        cart,
        note
      } = inputs;
      let customerId = this.req.customerId;
      let productIds = cart.map((e) => e.productId);
      let productInfos = await Books.getProductWithIds(productIds);
      let shipMoney = 18000;
      let totalMoney = 0 + shipMoney;
      let moneyAfterDiscount = {};
      productInfos.map((e) => {
        let money = e.price - e.price * (e.percentDiscount / 100);
        moneyAfterDiscount[e.id] = money;
      });
      let image = productInfos[0].images[0];
      let itemCount = 0;
      let orderItems = [];
      cart.map((e) => {
        let money = moneyAfterDiscount[e.productId] * e.amount;
        totalMoney += money;
        itemCount += e.amount;
      });
      let orderInfo = await Order.create({
        totalMoney,
        receiveName,
        receivePhone,
        receiveEmail,
        provinceId,
        districtId,
        wardId,
        address,
        methodPayment,
        customerId,
        shipMoney,
        itemCount,
        image,
        status : "wait_for_confirmation",
        note
      }).fetch();
      cart.map(e=>{
        let item = {
          orderId : orderInfo.id,
          productId: e.productId,
          amount: e.amount,
        };
        orderItems.push(item)
      })
      let orderItemInfos = await OrderItem.createEach(orderItems);
      return exits.success({
        code : 0,
        message : "Tạo đơn hàng thành công",
        orderInfo,
        orderItemInfos
      })
    } catch (error) {
      console.log(error);
      return exits.success({
        code : 1,
        message : "Tạo đơn hàng thất bại xin vui lòng thử lại sau."
      })
    }
  },
};
