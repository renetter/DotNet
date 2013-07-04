<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<!DOCTYPE html>

<html>
<head runat="server">
    <title>ViewWithAspx</title>
</head>
<body>
    <div>
        <% var greetings = new List<string> {"Morning", "Selamat Pagi", "Bonjour"}; %>
        
        <b>Greetings:</b>
        <ul>
            <% foreach (var greeting in greetings)
               {
                    %>
                <li>
                    <%: greeting %>
                </li>
            <%
               } %>
        </ul>
    </div>
</body>
</html>
