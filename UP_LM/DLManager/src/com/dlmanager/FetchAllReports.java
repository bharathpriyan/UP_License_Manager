package com.dlmanager;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
//import dlap.uzavupparai.com.*;

import org.json.JSONArray;
import org.json.JSONObject;

import com.uzhavupparai.dladmin.Admin;

@SuppressWarnings("serial")
public class FetchAllReports extends HttpServlet{

	    public void doGet(HttpServletRequest request, HttpServletResponse response)
	            throws javax.servlet.ServletException, java.io.IOException {
	        try {
	        	String days = request.getParameter("days");
	        	Admin a=(Admin) request.getSession().getAttribute("validAdmin");
	        	String[][] custStr = a.retrieveCustomers(days);
	        	JSONArray custArray = new JSONArray();
	        	for(String[] s:custStr){
	        		JSONObject o = new JSONObject();
	        		for(int i=0;i<s.length;i++)
	        			o.put("arg"+i, s[i]);
	        		custArray.put(o);
	        	}
	        	response.setContentType("application/json");
		        response.getWriter().print(custArray);
	        	//send result array here
	        	/*
	        	 * end - return data to javascript
	        	 */
	        } catch (Exception ex) {
	        	ex.printStackTrace();
	        }
	    }

	    public void doPost(HttpServletRequest request, HttpServletResponse response)
	            throws javax.servlet.ServletException, java.io.IOException {
	    }
	   
	     public void init( ){
	       }
	   
}
