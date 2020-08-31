using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Anbargol_React.Controllers.GetConnection;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Anbargol_React.Controllers.GetControls
{
    [Route("api/[controller]")]
    public class GetFormControls : Controller
    {
        public GetConnction con = new GetConnction();
        [HttpGet("/api/GetFormControls")]
        public IActionResult GetFormsControlResult()
        {
            con.Flower.Open();
            var dimension = new List<Controls>();
            var cmd = new SqlCommand("SELECT [dimension_id] as id, [flow_dimension] as dim FROM [flower_dimensions] " +
                                     "SELECT [arrange_id] as id, [arrange_type] as type FROM [arrange_type]", con.Flower);
            var r = cmd.ExecuteReader();
            while (r.Read())
            {
                dimension.Add(new Controls()
                {
                    Value = Convert.ToInt32(r["id"]),
                    Name = r["dim"].ToString()
                });
            }
            r.NextResult();
            var arrangeType = new List<Controls>();
            while (r.Read())
            {
                arrangeType.Add(new Controls()
                {
                    Value = Convert.ToInt32(r["id"]),
                    Name = r["type"].ToString()
                });
            }
            con.Flower.Close();
            return Json(new
            {
                ArrangeType = arrangeType,
                Dimensions = dimension
            });
        }
    }
}
