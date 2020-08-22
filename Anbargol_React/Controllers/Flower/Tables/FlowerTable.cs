using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Anbargol_React.Controllers.Flower.MainClasses;
using Anbargol_React.Controllers.GetConnection;
using Anbargol_React.Controllers.Pagination;
using Microsoft.AspNetCore.Mvc;

namespace Anbargol_React.Controllers.Flower.Tables
{
    [Route("api/[controller]")]
    public class FlowerTable : Controller
    {
        public GetConnction con = new GetConnction();
        public CalculatePages calculatePages = new CalculatePages();
        [HttpGet("/api/GetGolTable")]
        public IActionResult Get(int rowsInPage, int pageNumber = 1)
        {
            con.Flower.Open();
            var pagesCount = calculatePages.Calc("flower_entry", rowsInPage); // mohasebe tedad safahat
            var cmd = new SqlCommand("select * from (select ROW_NUMBER() OVER (Order by j.Id) as rn , * from " +
                                     "(SELECT flower_entry.flower_name, flower_entry.flower_code, flower_colors.flow_color, " +
                                     "flower_colortypes.flow_colortype, flower_formats.flow_format, " +
                                     "flower_customers.customer_name, flower_companies.company_name, " +
                                     "flower_entry.enter_date, flower_entry.comment, flower_colors.flowcolor_id, " +
                                     "flower_colortypes.colortype_id, flower_formats.flowformat_id, " +
                                     "flower_customers.customer_id, flower_companies.company_id, " +
                                     "flower_entry.id FROM flower_entry INNER JOIN flower_colortypes " +
                                     "ON flower_entry.flower_colortype = flower_colortypes.colortype_id INNER JOIN flower_formats " +
                                     "ON flower_entry.flower_format = flower_formats.flowformat_id INNER JOIN flower_customers " +
                                     "ON flower_entry.customer_name = flower_customers.customer_id INNER JOIN flower_companies " +
                                     "ON flower_entry.company_name = flower_companies.company_id INNER JOIN flower_colors " +
                                     "ON flower_entry.flower_color = flower_colors.flowcolor_id) as j)i " +
                                     (rowsInPage != 0
                                         ? ("where i.rn > ((" + pageNumber + " - 1) * " + rowsInPage + ") " +
                                            "and i.rn <= (" + pageNumber + " * " + rowsInPage + ")")
                                         : null)
                                     , con.Flower);
            var rd = cmd.ExecuteReader();
            var gols = new List<Gol>();
            while (rd.Read())
            {
                gols.Add(new Gol()
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
            return Json(new
            {
                rows = gols,
                pagesCount = pagesCount
            });
        }
    }
}
