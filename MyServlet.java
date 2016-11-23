




import java.io.BufferedReader;
import java.io.IOException;
 
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.*;
import java.util.*;

import org.json.JSONObject;


 
public class MyServlet extends HttpServlet {
 
 
  
 
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
	System.out.println("\n\n\n\n\n\n\n\n Hit it DUshyat ABHAYA ahjsaksgshdgshgdhdghdsg\n\n\n\n\n\n\n");
try{

        StringBuilder sb = new StringBuilder();
        BufferedReader br = request.getReader();
        String str = null;
        while ((str = br.readLine()) != null) {
            sb.append(str);
        }
        JSONObject jObj = new JSONObject(sb.toString());
Class.forName("oracle.jdbc.driver.OracleDriver");
//Connection c=DriverManager.getConnection("jdbc:oracle:thin:@localhost:8080:XE","System","1234");
Connection c =DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:XE","MYWEB","1234");
DriverManager.getConnection(
                    "jdbc:oracle:thin:@localhost:1521:XE","MYWEB","1234");
Statement s=c.createStatement();

Person person=new Person();
        person.FirstName = jObj.getString("FirstName");
person.LastName = jObj.getString("LastName");
person.Age = Integer.parseInt(jObj.getString("Age"));
person.DOB = jObj.getString("DOB");
person.Gender = jObj.getString("Gender");
person.MobileNo = jObj.getString("MobileNo");
person.FreeTextInfo = jObj.getString("FreeTextInfo");
int x=s.executeUpdate("insert into Person(FirstName,LastName,Age,DOB,Gender,MobileNo,FreeTextInfo) values(' "+person.FirstName+" ',' "+person.LastName+" ',' "+person.Age+" ',' "+person.DOB+"',' "+person.Gender +"',' "+person.MobileNo+"',' "+person.FreeTextInfo+"')");


 response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");
if(x>0)
{

 
       
        response.getWriter().write("Success");
}

else
response.getWriter().write("Record Could Not Be Inserted");

}

catch(Exception e)

{e.printStackTrace();
}
}
 



 
 public void doGet(HttpServletRequest request,HttpServletResponse response)throws ServletException,IOException
{

try{

        StringBuilder sb = new StringBuilder();
        BufferedReader br = request.getReader();
        String str = null;
        while ((str = br.readLine()) != null) {
            sb.append(str);
        }
        JSONObject jObj = new JSONObject(sb.toString());
Class.forName("oracle.jdbc.driver.OracleDriver");
Connection c =DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:XE","MYWEB","1234");
DriverManager.getConnection(
                    "jdbc:oracle:thin:@localhost:1521:XE","MYWEB","1234");
//Connection c=DriverManager.getConnection("jdbc:oracle:thin:@localhost:8080:MYWEB","System","1234");
Statement s=c.createStatement();


       String  FullName = jObj.getString("Name");





ResultSet rs=s.executeQuery("select * from person where concat(firstname,lastname)='"+FullName+"'");
LinkedList<Person> Persons=new LinkedList<Person>();
ArrayList<JSONObject> JSONList=new ArrayList<JSONObject>();
while(rs.next())
{
Person p= new Person();
p.FirstName=rs.getString(1);
p.LastName=rs.getString(2);
JSONObject jsonObject = new JSONObject(p);
JSONList.add(jsonObject);
}
String result="[";

int lstSize=JSONList.size();
if(lstSize>0){
for(int i=0;i<JSONList.size()-1;i++)

{

result+=JSONList.get(i).toString();
result+=",";

}

result+=JSONList.get(lstSize-1).toString();
result+="]";
}

 response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");
response.getWriter().write(result);
}

catch(Exception e)

{e.printStackTrace();
}
 

} 
 
}