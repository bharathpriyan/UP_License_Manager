package com.dlmanager;

import java.awt.Dimension;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JOptionPane;
import javax.swing.UIManager;
import javax.swing.filechooser.FileNameExtensionFilter;

import com.uzhavupparai.dladmin.Admin;
import com.uzhavupparai.dladmin.DBConnection.IncorrectFileType;
import com.uzhavupparai.dladmin.DBConnection.RejectFileExists;

@SuppressWarnings("serial")
public class ImportFile extends HttpServlet{
	
	class FilePicker extends JFrame{
		String chooseFile(){
			this.setAlwaysOnTop(true);
			try {
				UIManager.setLookAndFeel("com.sun.java.swing.plaf.windows.WindowsLookAndFeel");
			} catch (Exception e){
				e.printStackTrace();
			}
			JFileChooser jf = new JFileChooser();
			jf.setMinimumSize(new Dimension(500,500));
			jf.setDialogTitle("Choose a CSV file");
			jf.setFileFilter(new FileNameExtensionFilter("CSV Files", "csv"));
			jf.setPreferredSize(new Dimension(500, 400));
			int choiceReturn = jf.showOpenDialog(this);
			if(choiceReturn==JFileChooser.APPROVE_OPTION){
				return jf.getSelectedFile().getAbsolutePath().replace("\\", "/");
			}
			return null;
		}
	}
	
	private void writeToFile(String file,HttpServletResponse response) throws IOException{
		File template = new File("C:/Users/Fantasy/Desktop/test.csv");
		FileInputStream inStream = new FileInputStream(template);
		String mimeType = getServletContext().getMimeType("C:/Users/Fantasy/Desktop/test.csv");
		
		response.setContentType(mimeType);
		response.setContentLength((int)template.length());
				
		String headerKey = "Content-Disposition";
        String headerValue = String.format("attachment; filename=\"%s\"", template.getName());
        response.setHeader(headerKey, headerValue);
         
        // obtains response's output stream
        OutputStream outStream = response.getOutputStream();
         
        byte[] buffer = new byte[4096];
        int bytesRead = -1;
         
        while ((bytesRead = inStream.read(buffer)) != -1) {
            outStream.write(buffer, 0, bytesRead);
        }
         
        inStream.close();
        outStream.close(); 
	}
	
	class FileDownloader extends JFrame{
		void downloadFile(HttpServletResponse response) throws IOException{
			downloadFile(System.getProperty("user.home"),response);
		}
		void downloadFile(String parent,HttpServletResponse response) throws IOException{
			this.setAlwaysOnTop(true);
			try {
				UIManager.setLookAndFeel("com.sun.java.swing.plaf.windows.WindowsLookAndFeel");
			} catch (Exception e){
				e.printStackTrace();
			}
			JFileChooser jf = new JFileChooser();
			jf.setMinimumSize(new Dimension(500,500));
			jf.setDialogTitle("Choose a CSV file");
			jf.setFileFilter(new FileNameExtensionFilter("CSV Files", "csv"));
			jf.setPreferredSize(new Dimension(500, 400));
			jf.setCurrentDirectory(new File(parent));
			int choiceReturn = jf.showSaveDialog(this);
			if(choiceReturn==JFileChooser.APPROVE_OPTION){
				String file = jf.getSelectedFile().getAbsolutePath().replace("\\", "/");
				file = file.toLowerCase().endsWith(".csv")?file:file+".csv";
				File outputFile = new File(file);
				if(outputFile.exists() && outputFile.isFile()){
					int result = JOptionPane.showConfirmDialog(new JFileChooser(),"Do you want to overwrite the existing file?","Existing file",JOptionPane.YES_NO_CANCEL_OPTION);
					switch(result){
		            case JOptionPane.YES_OPTION:
		                writeToFile(file, response);
		                return;
		            case JOptionPane.NO_OPTION:
		            	new FileDownloader().downloadFile(outputFile.getParent(),response);
		                return;
		            case JOptionPane.CLOSED_OPTION:
		                return;
		            case JOptionPane.CANCEL_OPTION:
		                return;
					}	
				}
				else
					writeToFile(file,response);
			}
		}
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws javax.servlet.ServletException, java.io.IOException{
		writeToFile("waste.csv", response);

	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws javax.servlet.ServletException, java.io.IOException {
			String file = new FilePicker().chooseFile();
			
			Admin a=(Admin) request.getSession().getAttribute("validAdmin");
			
			if(file!=null){
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
				} catch (FileNotFoundException e) {
					response.setContentType("text/plain");
					response.setCharacterEncoding("UTF-8");
					response.getWriter().write("3");
				}
				catch (IOException e) {
					response.setContentType("text/plain");
					response.setCharacterEncoding("UTF-8");
					response.getWriter().write("4");
				}
			}
			else{
				response.setContentType("text/plain");
				response.setCharacterEncoding("UTF-8");
				response.getWriter().write("5");
			}
	}

	public void init( ){
	}

}
