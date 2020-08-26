using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Anbargol_React.Controllers.GetConnection;
using Anbargol_React.Controllers.Items.MainClasses;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Anbargol_React.Controllers.Items.Tables
{
    [Route("api/[controller]")]
    public class ItemsTable : Controller
    {
        public GetConnction con = new GetConnction();

        [HttpGet("/api/GetFlowerItems")]
        public IActionResult GetFlowerItems(int formId)
        {
            con.Flower.Open();
            var list = new List<ItemsClass>();
            var cmd = new SqlCommand("SELECT flower_arrange_items.form_number, items.item_name, " +
                                     "(CAST((ROUND((flower_arrange_items.item_insheet_count), 1))AS float)) " +
                                     "as item_insheet_count,flower_arrange_items.lent_of_item, " +
                                     "flower_arrange_items.comment, flower_arrange_items.id, " +
                                     "items.item_id, flower_arrange_items.flower_id, " +
                                     "flower_arrange_items.item_name AS item_name_id," +
                                     " flower_arrange_items.form_id FROM flower_arrange_items" +
                                     " INNER JOIN items ON flower_arrange_items.item_name = items.item_id " +
                                     "WHERE(flower_arrange_items.form_id = " + formId + ") ORDER BY items.item_name", con.Flower);
            var rd = cmd.ExecuteReader();
            while (rd.Read())
            {
                list.Add(new ItemsClass()
                {
                    Id = Convert.ToInt32(rd["item_id"]),
                    FormId = Convert.ToInt32(rd["form_id"]),
                    Name = rd["item_name"].ToString(),
                    ItemInSheet = rd["item_insheet_count"] != DBNull.Value ? Convert.ToDecimal(rd["item_insheet_count"]) : 0,
                    LentInSheet = rd["lent_of_item"] != DBNull.Value ? Convert.ToDecimal(rd["lent_of_item"]) : 0,
                    Comment = rd["comment"].ToString()
                });
            }
            con.Flower.Close();
            return Json(list);
        }
    }
}
