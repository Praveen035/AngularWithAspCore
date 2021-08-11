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
    public class RecipeController : Controller
    {
        private readonly IRecipe objrecipe;

        public RecipeController(IRecipe _objrecipe)
        {
            objrecipe = _objrecipe;
        }

        [HttpGet]
        [Route("Index")]
        public IEnumerable<Recipe> Index()
        {
            return objrecipe.GetAllRecipes();
        }

        [HttpPost]
        [Route("Create")]
        public int Create([FromBody] Recipe recipe)
        {
            return objrecipe.AddRecipe(recipe);
        }

        [HttpGet]
        [Route("Details/{id}")]
        public Recipe Details(int id)
        {
            return objrecipe.GetRecipeData(id);
        }

        [HttpPut]
        [Route("Edit")]
        public int Edit([FromBody] Recipe recipe)
        {
            return objrecipe.UpdateRecipe(recipe);
        }

        [HttpDelete]
        [Route("Delete/{id}")]
        public int Delete(int id)
        {
            return objrecipe.DeleteRecipe(id);
        }
    }
}
