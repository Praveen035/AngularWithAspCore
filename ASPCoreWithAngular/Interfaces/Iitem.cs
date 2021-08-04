using ASPCoreWithAngular.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ASPCoreWithAngular.Interfaces
{
    public interface Iitem    {
        IEnumerable<Item> GetAllItems();
        int AddItem(Item category);
        int UpdateItem(Item employee);
        Item GetItemData(int id);
        int DeleteItem(int id);
    }
}
