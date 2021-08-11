using ASPCoreWithAngular.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ASPCoreWithAngular.Interfaces
{
    public interface IRecipe
    {
        IEnumerable<Recipe> GetAllRecipes();

        int AddRecipe(Recipe recipe);

        int UpdateRecipe(Recipe recipe);
        Recipe GetRecipeData(int id);
        int DeleteRecipe(int id);
    }
}
