using System.Data.SqlClient;

namespace Anbargol_React.Controllers.GetConnection
{
    public class GetConnction
    {
        public SqlConnection Flower;

        public GetConnction()
        {
            Flower = new SqlConnection(connectionString: "Data Source=.;Initial Catalog=flower_depot;Integrated Security=True");
        }
    }
}
