package com.dlmanager;

import java.net.URLDecoder;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.uzhavupparai.dladmin.Admin;

@SuppressWarnings("serial")
public class RenewUser extends HttpServlet{

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws javax.servlet.ServletException, java.io.IOException {

	}

	public void doPut(HttpServletRequest request, HttpServletResponse response)
			throws javax.servlet.ServletException, java.io.IOException {
		try {
			String newExpiryDate = URLDecoder.decode(request.getParameter("expiryDate"),"UTF-8");
			String licenseNumber = URLDecoder.decode(request.getParameter("licenseNumber"),"UTF-8");

			Admin a = (Admin) request.getSession().getAttribute("validAdmin");
//			if(a.addCustomer(customerFirstName, customerLastName, guardianName, customerAge, gender, mobileNumber, 
//					altMobileNumber, licenseNumber, licenseType, licenseIssuedDate, licenseExpiryDate, 
//					licensRenewedDate, permanentAddressLine1, permanentAddressLine2,
//					permanentAddressPin, temporaryAddressLine1, temporaryAddressLine2, temporaryAddressPin)){
//			
//				response.setContentType("text/plain");
//				response.setCharacterEncoding("UTF-8");
//				response.getWriter().write("true"); //send success or failure as true or false (string)
//			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	public void init( ){
	}

}
