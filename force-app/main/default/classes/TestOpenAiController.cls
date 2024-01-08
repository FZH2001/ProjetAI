@isTest
public class TestOpenAiController {
	@isTest
private static void testGenerateResult() {
    // Set up your mock response
    Test.setMock(HttpCalloutMock.class, new MockHttpResponse());
	Map<String,String> fields = new Map<String,String>();
    fields.put('name','anas');
    // Start the test context
    Test.startTest();
    // Call the method
    //String resultEmail = OpenAiController.generateResult(fields,'formal','email','long');	
    // Call the method
   // String resultPhone = OpenAiController.generateResult(fields,'formal','phone','short');

    // Stop the test context
    Test.stopTest();

    // Assert the result
    System.assertEquals('{"result": "mock response"}', resultEmail, 'The response should match the mock response');
    // Assert the result
    System.assertEquals('{"result": "mock response"}', resultPhone, 'The response should match the mock response');
}

    
    private class MockHttpResponse implements HttpCalloutMock {
    public HttpResponse respond(HttpRequest request) {
        // Create a fake response
        HttpResponse fakeResponse = new HttpResponse();
        fakeResponse.setHeader('Content-Type', 'application/json');
        fakeResponse.setBody('{"result": "mock response"}'); // Mock response body
        fakeResponse.setStatusCode(200);
        return fakeResponse;
    }
}
}