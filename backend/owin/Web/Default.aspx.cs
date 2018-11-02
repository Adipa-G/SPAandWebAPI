using System;
using System.Web;

namespace Web
{
    public partial class Default : System.Web.UI.Page
    {
        public override void ProcessRequest(HttpContext context)
        {
            context.Response.Redirect("www/index.html", true);
        }

        protected void Page_Load(object sender, EventArgs e)
        {

        }
    }
}