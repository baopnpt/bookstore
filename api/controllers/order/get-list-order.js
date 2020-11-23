module.exports = {
  friendlyName: "Get list order",

  description: "",

  inputs: {},

  exits: {},

  fn: async function (inputs, exits) {
    try {
      let { status, skip, limit } = this.req.query;
      if (!skip) skip = 0;
      if (!limit) limit = 10;
      if (!status) status = "all";
      let customerId = this.req.customerId;
      let orderInfos;
      switch (status) {
        case "all": {
          orderInfos = await Order.find({
            where: {
              customerId,
            },
            skip,
            limit,
          });
          break;
        }
        default: {
          orderInfos = await Order.find({
            where: {
              customerId,
              status,
            },
            skip,
            limit,
          });
          break;
        }
      }
      // let orderInfoIds = orderInfos.map(e=>e.id);
      return exits.success({
        code: 0,
        message: "Thành công",
        data: orderInfos,
      });
    } catch (error) {
      return exits.success({
        code: 0,
        message: "Hệ thống bận xin vui lòng thử lại sau",
      });
    }
  },
};