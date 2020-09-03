using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Anbargol_React.Controllers.Flower.MainClasses;
using Anbargol_React.Controllers.GetConnection;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Anbargol_React.Controllers.Flower.EditGol
{
    [Route("api/[controller]")]
    public class EditGol : Controller
    {
        public GetConnction con = new GetConnction();
        [HttpGet]
        public IActionResult EditGolActionResult([FromBody] Gol gol)
        {
            return Json(gol);
        }
    }
}
