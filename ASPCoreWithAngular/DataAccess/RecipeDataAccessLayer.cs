using ASPCoreWithAngular.Interfaces;
using ASPCoreWithAngular.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace ASPCoreWithAngular.DataAccess
{
    public class RecipeDataAccessLayer:IRecipe
    {
        private string connectionString;
        public RecipeDataAccessLayer(IConfiguration configuration)
        {
            connectionString = configuration["ConnectionStrings:DefaultConnection"];
        }

        //To View all Categories details
        public IEnumerable<Recipe> GetAllRecipes()
        {
            try
            {
                List<Recipe> lstrecipes = new List<Recipe>();

                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spGetAllCategories", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();

                    while (rdr.Read())
                    {
                        Recipe recipe = new Recipe();
                        recipe.RecipeCategoryCode = rdr["RecipeCategoryCode"].ToString();
                        recipe.RecipeCategoryName = rdr["RecipeCategoryName"].ToString();
                        recipe.RecipeCode = rdr["RecipeCode"].ToString();
                        recipe.RecipeName = rdr["RecipeName"].ToString();
                        recipe.RecipeImage= rdr["RecipeImage"].ToString();
                        lstrecipes.Add(recipe);
                    }
                    con.Close();
                }
                return lstrecipes;
            }
            catch
            {
                throw;
            }
        }

        //To Add new category record 
        public int AddRecipe(Recipe recipe)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spAddCategory", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@RecipeCategoryCode", recipe.RecipeCategoryCode);
                    cmd.Parameters.AddWithValue("@RecipeCategoryName", recipe.RecipeCategoryName);
                    cmd.Parameters.AddWithValue("@RecipeCode", recipe.RecipeCode);
                    cmd.Parameters.AddWithValue("@RecipeName", recipe.RecipeName);
                    cmd.Parameters.AddWithValue("@RecipeImage", recipe.RecipeImage);                    
                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                return 1;
            }
            catch
            {
                throw;
            }
        }

        //To Update the records of a particluar category
        public int UpdateRecipe(Recipe recipe)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spUpdateCategory", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@RecipeCategoryCode", recipe.RecipeCategoryCode);
                    cmd.Parameters.AddWithValue("@RecipeCategoryName", recipe.RecipeCategoryName);
                    cmd.Parameters.AddWithValue("@RecipeCode", recipe.RecipeCode);
                    cmd.Parameters.AddWithValue("@RecipeName", recipe.RecipeName);
                    cmd.Parameters.AddWithValue("@RecipeImage", recipe.RecipeImage);                    
                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                return 1;
            }
            catch
            {
                throw;
            }
        }

        //Get the details of a particular category
        public Recipe GetRecipeData(int id)
        {
            try
            {
                Recipe recipe = new Recipe();

                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    string sqlQuery = "SELECT * FROM tblCategory WHERE CategoryId= " + id;
                    SqlCommand cmd = new SqlCommand(sqlQuery, con);

                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();

                    while (rdr.Read())
                    {                      
                        recipe.RecipeCategoryCode = rdr["RecipeCategoryCode"].ToString();
                        recipe.RecipeCategoryName = rdr["RecipeCategoryName"].ToString();
                        recipe.RecipeCode = rdr["RecipeCode"].ToString();
                        recipe.RecipeName = rdr["RecipeName"].ToString();
                        recipe.RecipeImage = rdr["RecipeImage"].ToString();
                    }
                }
                return recipe;
            }
            catch
            {
                throw;
            }
        }

        //To Delete the record on a particular employee
        public int DeleteRecipe(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spDeleteCategory", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@CategoryId", id);

                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                return 1;
            }
            catch
            {
                throw;
            }
        }
    }
}
