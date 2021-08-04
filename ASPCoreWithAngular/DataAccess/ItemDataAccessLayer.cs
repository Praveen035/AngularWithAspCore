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
    public class ItemDataAccessLayer:Iitem
    {
        private string connectionString;
        public ItemDataAccessLayer(IConfiguration configuration)
        {
            connectionString = configuration["ConnectionStrings:DefaultConnection"];
        }

        //To View all Items details
        public IEnumerable<Item> GetAllItems()
        {
            try
            {
                List<Item> lstItem = new List<Item>();

                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spGetAllItems", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();

                    while (rdr.Read())
                    {
                        Item item = new Item();
                        item.ItemId = Convert.ToInt32(rdr["ItemId"]);
                        item.ItemCode = rdr["ItemCode"].ToString();
                        item.ItemName = rdr["ItemName"].ToString();
                        item.Status = rdr["ItemStatus"].ToString();
                        lstItem.Add(item);
                    }
                    con.Close();
                }
                return lstItem;
            }
            catch
            {
                throw;
            }
        }

        //To Add new item record 
        public int AddItem(Item item)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spAddItem", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@ItemCode", item.ItemCode);
                    cmd.Parameters.AddWithValue("@ItemName", item.ItemName);
                    cmd.Parameters.AddWithValue("@ItemStatus",item.Status);
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

        //To Update the records of a particluar item
        public int UpdateItem(Item item)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spUpdateItem", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@ItemId", item.ItemId);
                    cmd.Parameters.AddWithValue("@ItemCode", item.ItemCode);
                    cmd.Parameters.AddWithValue("@ItemName", item.ItemName);
                    cmd.Parameters.AddWithValue("@ItemStatus", item.Status);
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

        //Get the details of a particular item
        public Item GetItemData(int id)
        {
            try
            {
                Item item = new Item();

                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    string sqlQuery = "SELECT * FROM tblItem WHERE ItemId= " + id;
                    SqlCommand cmd = new SqlCommand(sqlQuery, con);

                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();

                    while (rdr.Read())
                    {
                        item.ItemId = Convert.ToInt32(rdr["ItemId"]);
                        item.ItemCode = rdr["ItemCode"].ToString();
                        item.ItemName = rdr["ItemName"].ToString();
                        item.Status = rdr["ItemStatus"].ToString();
                    }
                }
                return item;
            }
            catch
            {
                throw;
            }
        }

        //To Delete the record on a particular employee
        public int DeleteItem(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spDeleteItem", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@ItemId", id);

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
