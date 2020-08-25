using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Anbargol_React.Controllers.Forms.MainClasses
{
    public class FormsClass
    {
        public int Id { get; set; }
        public int FormId { get; set; }
        public string FormName { get; set; }
        public int ArrangeTypeId { get; set; }
        public string ArrangeType { get; set; }
        public int DimensionId { get; set; }
        public string Dimension { get; set; }
        public int Count { get; set; }
        public string Mark { get; set; }
        public string EnterDate { get; set; }
        public string Comment { get; set; }
    }
}
