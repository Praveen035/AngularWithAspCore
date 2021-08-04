using ASPCoreWithAngular.Interfaces;
using ASPCoreWithAngular.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ASPCoreWithAngular.Controllers
{
    [Route("api/[controller]")]    
    public class ItemController : Controller
    {
        private readonly Iitem objitem;

        public ItemController(Iitem _objitem)
        {
            objitem = _objitem;
        }

        [HttpGet]
        [Route("Index")]
        public IEnumerable<Item> Index()
        {
            return objitem.GetAllItems();
        }

        [HttpPost]
        [Route("Create")]
        public int Create([FromBody] Item item)
        {
            return objitem.AddItem(item);
        }

        [HttpGet]
        [Route("Details/{id}")]
        public Item Details(int id)
        {
            return objitem.GetItemData(id);
        }

        [HttpPut]
        [Route("Edit")]
        public int Edit([FromBody] Item item)
        {
            return objitem.UpdateItem(item);
        }

        [HttpDelete]
        [Route("Delete/{id}")]
        public int Delete(int id)
        {
            return objitem.DeleteItem(id);
        }      
    }
}
