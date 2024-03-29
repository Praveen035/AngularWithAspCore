﻿using ASPCoreWithAngular.Interfaces;
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
    public class CategoryDataAccessLayer : ICategory
    {
        private string connectionString;
        public CategoryDataAccessLayer(IConfiguration configuration)
        {
            connectionString = configuration["ConnectionStrings:DefaultConnection"];
        }

        //To View all Categories details
        public IEnumerable<Category> GetAllCategories()
        {
            try
            {
                List<Category> lstcategory = new List<Category>();

                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spGetAllCategories", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();

                    while (rdr.Read())
                    {
                        Category category = new Category();
                        category.CategoryId = Convert.ToInt32(rdr["CategoryId"]);                       
                        category.CategoryCode = rdr["CategoryCode"].ToString();
                        category.CategoryName = rdr["CategoryName"].ToString();
                        lstcategory.Add(category);
                    }
                    con.Close();
                }
                return lstcategory;
            }
            catch
            {
                throw;
            }
        }

        //To Add new category record 
        public int AddCategory(Category category)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spAddCategory", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@CategoryCode", category.CategoryCode);
                    cmd.Parameters.AddWithValue("@CategoryName", category.CategoryName);                   
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
        public int UpdateCategory(Category category)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spUpdateCategory", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@CategoryId", category.CategoryId);
                    cmd.Parameters.AddWithValue("@CategoryCode", category.CategoryCode);
                    cmd.Parameters.AddWithValue("@CategoryName", category.CategoryName);                    
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
        public Category GetCategoryData(int id)
        {
            try
            {
                Category category = new Category();

                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    string sqlQuery = "SELECT * FROM tblCategory WHERE CategoryId= " + id;
                    SqlCommand cmd = new SqlCommand(sqlQuery, con);

                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();

                    while (rdr.Read())
                    {
                        category.CategoryId = Convert.ToInt32(rdr["CategoryId"]);                       
                        category.CategoryCode = rdr["CategoryCode"].ToString();
                        category.CategoryName = rdr["CategoryName"].ToString();                       
                    }
                }
                return category;
            }
            catch
            {
                throw;
            }
        }

        //To Delete the record on a particular employee
        public int DeleteCategory(int id)
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
