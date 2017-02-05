package com.dlmanager;

import java.net.URLDecoder;
import java.util.Calendar;
import java.util.Date;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.uzhavupparai.dladmin.Admin;

@SuppressWarnings("serial")
public class RenewUser extends HttpServlet{

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws javax.servlet.ServletException, java.io.IOException {

	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws javax.servlet.ServletException, java.io.IOException {
		try {
			String licenseNumber = URLDecoder.decode(request.getParameter("licenseNumber"),"UTF-8");
			Admin a = (Admin) request.getSession().getAttribute("validAdmin");
			String[] customerDetails = a.retrieveCustomerDetails(licenseNumber);
			int custAge = Integer.parseInt(customerDetails[17].substring(0, 4));
			String licenseTypeFromDB = customerDetails[13];
			Calendar cal = Calendar.getInstance();
			if(licenseTypeFromDB == "LMVH" || licenseTypeFromDB == "MCWG"){
				if(custAge<=40){
					cal.add(Calendar.YEAR, 40-custAge);
				}else if(custAge>40 && custAge<=50){
					cal.add(Calendar.YEAR, 10);
				}else if(custAge>50){
					cal.add(Calendar.YEAR, 5);
				}
			}else if(licenseTypeFromDB == "HAZ"){
				cal.add(Calendar.YEAR, 1);
			}else{
				cal.add(Calendar.YEAR, 3);
			}
			Date expiryDate = cal.getTime();
			a.renewCustomerLicense(licenseNumber, expiryDate);			
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
