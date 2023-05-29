export default class Pagination{
    static paginate(model: any, limit: number, page: number){
      const data =  model.limit(limit * 1).skip((page - 1) * limit).sort({ createdAt: -1 });
      const count = model.countDocuments();
      return {
        data,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      };
    }
}