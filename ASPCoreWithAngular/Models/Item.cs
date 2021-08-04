using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ASPCoreWithAngular.Models
{
    public class Item
    {
        public int ItemId { get; set; }
        public string ItemCode { get; set; }

        public string ItemName { get; set; }

        public string Status { get; set; }
    }
}
