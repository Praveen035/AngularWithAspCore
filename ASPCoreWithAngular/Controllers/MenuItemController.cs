using ASPCoreWithAngular.Interfaces;
using ASPCoreWithAngular.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ASPCoreWithAngular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuItemController : Controller
    {

        private readonly ICategory objemployee;

        public MenuItemController(ICategory _objemployee)
        {
            objemployee = _objemployee;
        }
        
    }
}
