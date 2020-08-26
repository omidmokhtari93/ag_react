using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Anbargol_React.Controllers.Items.MainClasses
{
    public class ItemsClass
    {
        public int Id { get; set; }
        public int FormId { get; set; }
        public string Name { get; set; }
        public decimal ItemInSheet { get; set; }
        public decimal LentInSheet { get; set; }
        public string Comment { get; set; }
    }
}
