package com.dlmanager;

import java.net.URLDecoder;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

@SuppressWarnings("serial")
public class AddNewCustomer extends HttpServlet{

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws javax.servlet.ServletException, java.io.IOException {

	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws javax.servlet.ServletException, java.io.IOException {
		try {
			String userData = URLDecoder.decode(request.getParameter("userData"),"UTF-8");
			if(userData.length()>0){
				JSONObject newUserObj = new JSONObject(userData);
				if(newUserObj instanceof JSONObject){
					String customerFirstName = newUserObj.getString("customerFirstName");
					String customerLastName = newUserObj.getString("customerLastName");
					String guardianName = newUserObj.getString("guardianName");
					String customerAge = newUserObj.getString("customerAge");
					String gender = newUserObj.getString("gender");
					String mobileNumber = newUserObj.getString("mobileNumber");
					String altMobileNumber = newUserObj.getString("altMobileNumber");
					String licenseNumber = newUserObj.getString("licenseNumber");
					String licenseType = newUserObj.getString("licenseType");
					String licenseIssuedDate = newUserObj.getString("licenseIssuedDate");
					String licenseExpiryDate = newUserObj.getString("licenseExpiryDate");
					String licensRenewedDate = newUserObj.getString("licensRenewedDate");

					JSONObject permenantAddress = newUserObj.getJSONObject("permenantAddress");
					JSONObject temporaryAddress = newUserObj.getJSONObject("temporaryAddress");
					if(permenantAddress instanceof JSONObject){
						String permanentAddressLine1 = permenantAddress.getString("permanentAddressLine1");
						String permanentAddressLine2 = permenantAddress.getString("permanentAddressLine2");
						String permanentAddressPin = permenantAddress.getString("permanentAddressPin");
					}
					if(temporaryAddress instanceof JSONObject){
						String temporaryAddressLine1 = temporaryAddress.getString("temporaryAddressLine1");
						String temporaryAddressLine2 = temporaryAddress.getString("temporaryAddressLine2");
						String temporaryAddressPin = temporaryAddress.getString("temporaryAddressPin");
					}
				}
			}

			/*
			 * start - return data to javascript
			 */
			response.setContentType("text/plain");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write("true"); //send success or failure as true or false (string)
			/*
			 * end - return data to javascript
			 */
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	public void init( ){
	}

}
