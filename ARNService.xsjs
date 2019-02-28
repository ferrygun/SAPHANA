var select_all_framedetails_query = "select \"APPLICATION_ID\" from \"Common_Basis\".\"z_applications\", \"Common_Basis\".\"z_capabilities\" where \"Common_Basis\".\"z_capabilities\".\"CAPABILITYOWNER\" like '%Nakkella, Rao%' and \"Common_Basis\".\"z_capabilities\".\"APPLICATIONS_ID\" = \"Common_Basis\".\"z_applications\".\"APPLICATION_ID\";";
var paramIDs = $.request.parameters.get('id');
                     

function close(closables) {
          var closable;
          var i;
          for (i = 0; i < closables.length; i++) {
                    closable = closables[i];
                    if(closable) {
                              closable.close();
                    } 
          }
}
function getFrameDetails(){
          var FrameDetailsList = [];
          var connection = $.db.getConnection("testxsmd::anonuser");
          var statement = null;
          var resultSet = null;
          try{
                    statement = connection.prepareStatement(select_all_framedetails_query);
                    resultSet = statement.executeQuery();
                    var framedetails;
                
                    while (resultSet.next()) {
                              framedetails = {};
                              framedetails.APPLICATION_ID = resultSet.getString(1);
                              
                              FrameDetailsList.push(framedetails);
                    }
          } finally {
                    close([resultSet, statement, connection]);
          }
          return FrameDetailsList;
}
function doGet() {
          try{
                    $.response.contentType = "application/json";
                    $.response.setBody(JSON.stringify(getFrameDetails()));
                    //$.response.setBody(JSON.stringify(paramIDs));
          }
          catch(err){
                    $.response.contentType = "text/plain";
                    $.response.setBody("Error while executing query: [" + err.message + "]");
                    $.response.returnCode = 200;
          }
}
doGet();