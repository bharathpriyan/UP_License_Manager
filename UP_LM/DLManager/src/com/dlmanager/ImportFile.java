package com.dlmanager;

import java.net.URLDecoder;
import java.util.Calendar;
import java.util.Date;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.uzhavupparai.dladmin.Admin;

@SuppressWarnings("serial")
public class ImportFile extends HttpServlet{

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws javax.servlet.ServletException, java.io.IOException {

	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws javax.servlet.ServletException, java.io.IOException {
		try {
			
			Part file = request.getPart("file");
			
			response.setContentType("text/plain");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write("true"); //send success or failure as true or false (string)
//			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	public void init( ){
	}

}
