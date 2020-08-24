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
            var color = new List<Controls>();
            var cm = new SqlCommand("SELECT flowcolor_id as id ,flow_color as name FROM flower_colors " +
                                    "select flowformat_id as id, flow_format as name from flower_formats " +
                                    "select customer_id as id, customer_name as name from flower_customers " +
                                    "select company_id  as id, company_name as name from flower_companies " +
                                    "SELECT colortype_id as id ,flow_colortype as name FROM flower_colortypes", con);
            var r = cm.ExecuteReader();
            while (r.Read())
            {
                color.Add(new Controls()
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
            r.NextResult();
            var colorType = new List<Controls>();
            while (r.Read())
            {
                colorType.Add(new Controls()
                {
                    Id = Convert.ToInt32(r["id"]),
                    Name = r["name"].ToString()
                });
            }
            con.Close();
            return Json(new
            {
                colors = color,
                formats = format,
                customers = customer,
                companies = company,
                colorTypes = colorType
            });
        }
    }
}

public class Controls
{
    public int Id { get; set; }
    public string Name { get; set; }
}
