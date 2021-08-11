using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ASPCoreWithAngular.Models
{
    public class Recipe
    {
        public int RecipeCategoryId { get; set; }
        public string RecipeCategoryCode { get; set; }

        public string RecipeCategoryName { get; set; }

        public string RecipeCode { get; set; }

        public string RecipeName { get; set; }

        public string RecipeImage { get; set; }

    }
}
