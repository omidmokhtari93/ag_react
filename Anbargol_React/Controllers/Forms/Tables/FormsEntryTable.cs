using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Anbargol_React.Controllers.Forms.MainClasses;
using Anbargol_React.Controllers.GetConnection;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Anbargol_React.Controllers.Forms.Tables
{
    [Route("api/[controller]")]
    public class FormsEntryTable : Controller
    {
        public GetConnction con = new GetConnction();
        [HttpGet("/api/GetFlowerForms")]
        public IActionResult Get()
        {
            con.Flower.Open();
            var forms = new List<FormsClass>();
            var cmd = new SqlCommand("SELECT flower_forms_entry.form_number, " +
                                     "arrange_type.arrange_type, flower_dimensions.flow_dimension, " +
                                     "flower_forms_entry.sheetcount, flower_forms_entry.mark_type, " +
                                     "flower_forms_entry.comment, flower_forms_entry.id, " +
                                     "flower_forms_entry.flower_id, flower_forms_entry.last_enter_date " +
                                    "FROM flower_forms_entry INNER JOIN arrange_type " +
                                    " ON flower_forms_entry.arrange_type = arrange_type.arrange_id " +
                                    "INNER JOIN flower_dimensions ON flower_forms_entry.dimension = flower_dimensions.dimension_id " +
                                    "WHERE(flower_forms_entry.flower_id = 2499) ORDER BY flower_forms_entry.form_number", con.Flower);
            var rd = cmd.ExecuteReader();
            if (rd.Read())
            {
                forms.Add(new FormsClass()
                {
                    FormName = rd["form_number"].ToString(),
                    ArrangeType = rd["arrangetype"].ToString(),
                    Dimension = rd["dimension"].ToString(),
                    Count = Convert.ToInt32(rd["sheetcount"]),
                    Mark = rd["mark"].ToString(),
                    Comment = rd["comment"].ToString(),
                    EnterDate = rd["last_enter_date"].ToString(),
                });
            }
            con.Flower.Close();
            return Json(123);
        }
    }
}
