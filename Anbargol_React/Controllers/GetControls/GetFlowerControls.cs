using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Anbargol_React.Controllers.GetConnection;
using Microsoft.AspNetCore.Mvc;

namespace Anbargol_React.Controllers
{
    [Route("api/[controller]")]
    public class GetFlowerControls : Controller
    {
        public GetConnction GetConnction = new GetConnction();

        [HttpGet("/api/GetGolControls")]
        public IActionResult FillControls()
        {
            var con = GetConnction.Flower;
            con.Open();
            var items = new List<Controls>();
            var cm = new SqlCommand("select item_id as id ,item_name as name FROM items where item_id <> 0 order by item_name " +
                                    "select flowformat_id as id, flow_format as name from flower_formats " +
                                    "select customer_id as id, customer_name as name from flower_customers " +
                                    "select company_id  as id, company_name as name from flower_companies", con);
            var r = cm.ExecuteReader();
            while (r.Read())
            {
                items.Add(new Controls()
                {
                    Id = Convert.ToInt32(r["id"]),
                    Name = r["name"].ToString()
                });
            }
            r.NextResult();
            var format = new List<Controls>();
            while (r.Read())
            {
                format.Add(new Controls()
                {
                    Id = Convert.ToInt32(r["id"]),
                    Name = r["name"].ToString()
                });
            }
            r.NextResult();
            var customer = new List<Controls>();
            while (r.Read())
            {
                customer.Add(new Controls()
                {
                    Id = Convert.ToInt32(r["id"]),
                    Name = r["name"].ToString()
                });
            }
            r.NextResult();
            var company = new List<Controls>();
            while (r.Read())
            {
                company.Add(new Controls()
                {
                    Id = Convert.ToInt32(r["id"]),
                    Name = r["name"].ToString()
                });
            }
            con.Close();
            return Json(new
            {
                items = items,
                format = format,
                customer = customer,
                compnay = company
            });
        }
    }
}

public class Controls
{
    public int Id { get; set; }
    public string Name { get; set; }
}
