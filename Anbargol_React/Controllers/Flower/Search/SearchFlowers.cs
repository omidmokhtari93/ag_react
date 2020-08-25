using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Anbargol_React.Controllers.Flower.MainClasses;
using Anbargol_React.Controllers.GetConnection;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Anbargol_React.Controllers.Flower.Search
{
    [Route("api/[controller]")]
    public class SearchFlowers : Controller
    {
        public GetConnction con = new GetConnction();
        [HttpGet("/api/SearchGol")]
        public IActionResult SearchInGol(string name, string code)
        {
            var farsi1 = name.Replace("ک", "ك").Replace("ی", "ي").Replace("ة", "ه");
            var farsi2 = name.Replace("ك", "ک").Replace("ي", "ی").Replace("ه", "ة");
            con.Flower.Open();
            var listGol = new List<Gol>();
            var cmd = new SqlCommand("SELECT dbo.flower_colors.flow_color, dbo.flower_colortypes.flow_colortype, flower_entry.id, " +
                                     "dbo.flower_formats.flow_format, dbo.flower_customers.customer_name, dbo.flower_companies.company_name " +
                                     ", flower_entry.flower_name, flower_entry.flower_code, flower_entry.enter_date " +
                                     ", flower_entry.comment FROM dbo.flower_entry INNER JOIN " +
                                     "dbo.flower_colors ON dbo.flower_entry.flower_color = dbo.flower_colors.flowcolor_id INNER JOIN " +
                                     "dbo.flower_colortypes ON dbo.flower_entry.flower_colortype = dbo.flower_colortypes.colortype_id INNER JOIN " +
                                     "dbo.flower_formats ON dbo.flower_entry.flower_format = dbo.flower_formats.flowformat_id INNER JOIN " +
                                     "dbo.flower_customers ON dbo.flower_entry.customer_name = dbo.flower_customers.customer_id INNER JOIN " +
                                     "dbo.flower_companies ON dbo.flower_entry.company_name = dbo.flower_companies.company_id " +
                                     "where flower_entry.flower_name like N'%" + name + "%' or " +
                                     "flower_entry.flower_name like N'%" + farsi1 + "%' or " +
                                     "flower_entry.flower_name like N'%" + farsi2 + "%' or " +
                                     "flower_entry.flower_code like N'%" + code + "%'", con.Flower);
            var rd = cmd.ExecuteReader();
            while (rd.Read())
            {
                listGol.Add(new Gol()
                {
                    Id = Convert.ToInt32(rd["id"]),
                    GolName = rd["flower_name"].ToString(),
                    Color = rd["flow_color"].ToString(),
                    ColorType = rd["flow_colortype"].ToString(),
                    Format = rd["flow_format"].ToString(),
                    Code = rd["flower_code"].ToString(),
                    EnterDate = rd["enter_date"].ToString(),
                    Customer = rd["customer_name"].ToString(),
                    Company = rd["company_name"].ToString(),
                    Comment = rd["comment"].ToString()
                });
            }
            con.Flower.Close();
            return Json(listGol);
        }
    }
}
