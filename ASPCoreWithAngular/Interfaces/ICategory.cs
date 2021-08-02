using ASPCoreWithAngular.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ASPCoreWithAngular.Interfaces
{
    public interface ICategory
    {
        IEnumerable<Category> GetAllCategories();

        int AddCategory(Category category);
        
        int UpdateCategory(Category employee);
        Category GetCategoryData(int id);
        int DeleteCategory(int id);


    }
}
