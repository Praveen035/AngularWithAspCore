using ASPCoreWithAngular.Interfaces;
using ASPCoreWithAngular.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ASPCoreWithAngular.Controllers
{
    [Route("api/[controller]")]
    public class CategoryController : Controller
    {
        private readonly ICategory objcategory;

        public CategoryController(ICategory _objcategory)
        {
            objcategory = _objcategory;
        }

        [HttpGet]
        [Route("Index")]
        public IEnumerable<Category> Index()
        {
            return objcategory.GetAllCategories();
        }

        [HttpPost]
        [Route("Create")]
        public int Create([FromBody] Category category)
        {
            return objcategory.AddCategory(category);
        }

        [HttpGet]
        [Route("Details/{id}")]
        public Category Details(int id)
        {
            return objcategory.GetCategoryData(id);
        }

        [HttpPut]
        [Route("Edit")]
        public int Edit([FromBody] Category category)
        {
            return objcategory.UpdateCategory(category);
        }

        [HttpDelete]
        [Route("Delete/{id}")]
        public int Delete(int id)
        {
            return objcategory.DeleteCategory(id);
        }
    }
}
