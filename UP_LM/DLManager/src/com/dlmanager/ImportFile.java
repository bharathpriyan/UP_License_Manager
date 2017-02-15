package com.dlmanager;

import java.awt.FileDialog;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.swing.JFrame;

import com.uzhavupparai.dladmin.Admin;
import com.uzhavupparai.dladmin.DBConnection.IncorrectFileType;
import com.uzhavupparai.dladmin.DBConnection.RejectFileExists;

@SuppressWarnings("serial")
public class ImportFile extends HttpServlet{
	
	class FilePicker extends JFrame{
		String chooseFile(){
			FileDialog fd = new FileDialog(this, "Choose a CSV file", FileDialog.LOAD);
			fd.setFocusableWindowState(false);
			fd.setVisible(true);
			try {
				Thread.sleep(1000);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			fd.setFocusableWindowState(true);
			fd.toFront();
			return (fd.getDirectory()+fd.getFile()).replace("\\", "/");
		}
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response){

	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws javax.servlet.ServletException, java.io.IOException {
			String file = new FilePicker().chooseFile();
			
			Admin a=(Admin) request.getSession().getAttribute("validAdmin");
			
				try {
					if(a.importCustomers(file)){	
						response.setContentType("text/plain");
						response.setCharacterEncoding("UTF-8");
						response.getWriter().write("0"); //send success or failure as true or false (string)
					}
				} catch (IncorrectFileType e) {
					e.printStackTrace();
					response.setContentType("text/plain");
					response.setCharacterEncoding("UTF-8");
					response.getWriter().write("1");
				} catch (RejectFileExists e) {
					e.printStackTrace();
					response.setContentType("text/plain");
					response.setCharacterEncoding("UTF-8");
					response.getWriter().write("2"+e.getMessage());
				}
	}

	public void init( ){
	}

}
