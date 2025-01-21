const buildFindBy = (query) => {
    let findby = {};
  
    if (query.user) {
      findby.user = query.user;
    }
  
    if (query.startDate && query.endDate) {
        findby.createdAt = { $gte: new Date(query.startDate), $lte: new Date(query.endDate) };
    }
  
    if (query.categoryName) {
      findby.categoryName = query.categoryName;
    }

    if(query.date) {
      const today = new Date();
      const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      const startOfYear = new Date(today.getFullYear(), 0, 1);
      const startOfLastYear = new Date(today.getFullYear() - 1, 0, 1);
      const endOfLastYear = new Date(today.getFullYear() - 1, 11, 31);

      if(query.date === "today") {
      findby.createdAt = { $gte: new Date().setHours(0, 0, 0, 0), $lte: new Date().setHours(23, 59, 59, 999) };
      } else if(query.date === "this_week") {
      findby.createdAt = { $gte: startOfWeek, $lte: new Date() };
      } else if(query.date === "this_month") {
      findby.createdAt = { $gte: startOfMonth, $lte: new Date() };
      } else if(query.date === "last_month") {
      findby.createdAt = { $gte: startOfLastMonth, $lte: endOfLastMonth };
      } else if(query.date === "this_year") {
      findby.createdAt = { $gte: startOfYear, $lte: new Date() };
      } else if(query.date === "last_year") {
      findby.createdAt = { $gte: startOfLastYear, $lte: endOfLastYear };
      }
    }
  
    return findby;
  };
  
  module.exports = {
    buildFindBy,
  };
  