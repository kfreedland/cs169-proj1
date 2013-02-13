import unittest
import os
import testLib

class testAdditional(testLib.RestTestCase):
    """Test adding users"""
    def assertResponse(self, respData, count = None, errCode = testLib.RestTestCase.SUCCESS):
        """
        Check that the response data dictionary matches the expected values
        """
        expected = { 'errCode' : errCode }
        if count is not None:
            expected['count']  = count
        self.assertDictEqual(expected, respData)

    def testAddSame(self):
        respData1 = self.makeRequest("/users/add", method="POST", data = { 'user' : 'user2', 'password' : 'password'} )
        respData2 = self.makeRequest("/users/add", method="POST", data = { 'user' : 'user2', 'password' : 'password'} )
        self.assertResponse(respData2, errCode = testLib.RestTestCase.ERR_USER_EXISTS)

    def testAddBadUname(self):
      respData = self.makeRequest("/users/add", method="POST", data = { 'user' : '', 'password' : 'password'} )
    	self.assertResponse(respData, errCode = testLib.RestTestCase.ERR_BAD_USERNAME)
    	respData = self.makeRequest("/users/add", method="POST", data = { 'user' : None, 'password' : 'password'} )
    	self.assertResponse(respData, errCode = testLib.RestTestCase.ERR_BAD_USERNAME)
    	longName = ""
    	for i in range(129):
    		longName+="z"
    	respData = self.makeRequest("/users/add", method="POST", data = { 'user' : longName, 'password' : 'password'} )
    	self.assertResponse(respData, errCode = testLib.RestTestCase.ERR_BAD_USERNAME)

    def testAddBadPass(self):
    	respData = self.makeRequest("/users/add", method="POST", data = { 'user' : 'user3', 'password' : ''} )
    	self.assertResponse(respData, errCode = testLib.RestTestCase.ERR_BAD_PASSWORD)
    	respData = self.makeRequest("/users/add", method="POST", data = { 'user' : 'user3', 'password' : None} )
    	self.assertResponse(respData, errCode = testLib.RestTestCase.ERR_BAD_PASSWORD)
    	longPass = ""
    	for i in range(129):
    		longPass+="z"
    	respData = self.makeRequest("/users/add", method="POST", data = { 'user' : 'user3', 'password' : longPass} )
    	self.assertResponse(respData, errCode = testLib.RestTestCase.ERR_BAD_PASSWORD)

    def testGoodLogin(self):
    	respData1 = self.makeRequest("/users/add", method="POST", data = { 'user' : 'user3', 'password' : 'password'} )
    	respData2 = self.makeRequest("/users/login", method="POST", data = { 'user' : 'user3', 'password' : 'password'} )
    	self.assertResponse(respData2, count = 2, errCode = testLib.RestTestCase.SUCCESS)

    def testBadLogin1(self):
    	respData1 = self.makeRequest("/users/login", method="POST", data = { 'user' : 'user4', 'password' : 'password'} )
    	self.assertResponse(respData1, errCode = testLib.RestTestCase.ERR_BAD_CREDENTIALS)

    def testBadLogin2(self):
    	respData1 = self.makeRequest("/users/add", method="POST", data = { 'user' : 'user4', 'password' : 'password'} )
    	respData2 = self.makeRequest("/users/login", method="POST", data = { 'user' : 'user4', 'password' : 'badPass'} )
    	self.assertResponse(respData2, errCode = testLib.RestTestCase.ERR_BAD_CREDENTIALS)
