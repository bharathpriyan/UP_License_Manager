package com.dlmanager;

import java.net.URLDecoder;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.uzhavupparai.dladmin.Admin;

@SuppressWarnings("serial")
public class UpdateCustomerDetail extends HttpServlet{

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws javax.servlet.ServletException, java.io.IOException {

	}

	public void doPut(HttpServletRequest request, HttpServletResponse response)
			throws javax.servlet.ServletException, java.io.IOException {
		try {
			String userData = URLDecoder.decode(request.getParameter("userData"),"UTF-8");
			String customerFirstName ="";
			String customerLastName ="";
			String guardianName ="";
			String customerAge ="";
			String gender ="";
			String mobileNumber ="";
			String altMobileNumber ="";
			String licenseNumber ="";
			String licenseType ="";
			String licenseIssuedDate ="";
			String licenseExpiryDate ="";
			String licensRenewedDate="";
			String permanentAddressLine1="";
			String permanentAddressLine2="";
			String permanentAddressPin="";
			String temporaryAddressLine1="";
			String temporaryAddressLine2="";
			String temporaryAddressPin="";
			
			if(userData.length()>0){
				JSONObject newUserObj = new JSONObject(userData);
				if(newUserObj instanceof JSONObject){
					customerFirstName = newUserObj.getString("customerFirstName");
					customerLastName = newUserObj.getString("customerLastName");
					guardianName = newUserObj.getString("guardianName");
					customerAge = newUserObj.getString("customerAge");
					gender = newUserObj.getString("gender").substring(0,1).toUpperCase();
					 mobileNumber = newUserObj.getString("mobileNumber");
					altMobileNumber = newUserObj.getString("altMobileNumber");
					licenseNumber = newUserObj.getString("licenseNumber");
					licenseType = newUserObj.getString("licenseType");
					licenseIssuedDate = newUserObj.getString("licenseIssuedDate");
					licenseExpiryDate = newUserObj.getString("licenseExpiryDate");
					licensRenewedDate = newUserObj.getString("licensRenewedDate");

					JSONObject permenantAddress = newUserObj.getJSONObject("permenantAddress");
					JSONObject temporaryAddress = newUserObj.getJSONObject("temporaryAddress");
					if(permenantAddress instanceof JSONObject){
						permanentAddressLine1 = permenantAddress.getString("permanentAddressLine1");
						permanentAddressLine2 = permenantAddress.getString("permanentAddressLine2");
						permanentAddressPin = permenantAddress.getString("permanentAddressPin");
					}
					if(temporaryAddress instanceof JSONObject){
						temporaryAddressLine1 = temporaryAddress.getString("temporaryAddressLine1");
						temporaryAddressLine2 = temporaryAddress.getString("temporaryAddressLine2");
						temporaryAddressPin = temporaryAddress.getString("temporaryAddressPin");
					}
				}
			}

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
