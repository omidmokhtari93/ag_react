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
    public class GetItemsControls : Controller
    {
        public GetConnction con = new GetConnction();
        [HttpGet("/api/GetItemsControls")]
        public IActionResult GetItemsControlsResult()
        {
            con.Flower.Open();
            var items = new List<Controls>();
            var cmd = new SqlCommand("SELECT item_id as id, item_name as name " +
                                     "FROM items WHERE(item_id <> 0) order by item_name", con.Flower);
            var r = cmd.ExecuteReader();
            while (r.Read())
            {
                items.Add(new Controls()
                {
                    Value = Convert.ToInt32(r["id"]),
                    Name = r["name"].ToString()
                });
            }
            con.Flower.Close();
            return Json(new
            {
                Items = items
            });
        }
    }
}
