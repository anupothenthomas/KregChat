package com.kregos.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kregos.configuration.WebSocketServer;
import com.kregos.dao.BlogDAO;
import com.kregos.dao.ForumDAO;
import com.kregos.dao.JobDAO;
import com.kregos.dao.UsersDAO;
import com.kregos.model.Blog;
import com.kregos.model.Forum;
import com.kregos.model.Job;
import com.kregos.model.Users;

@RestController
public class KregRestController {
	@Autowired
	BlogDAO bdao;

	@Autowired
	ForumDAO fdao;

	@Autowired
	UsersDAO udao;

	@Autowired
	JobDAO jdao;

	/*--------------------------------------------DELETE BLOG ---------------------------------------------*/
	/*-------------------------DELETE BLOG --------------------------*/

	@RequestMapping(value = "/deleteBlog", method = RequestMethod.POST)
	public ResponseEntity<String> deleteBlog(@RequestBody String body) {
		System.out.println("Deleting Blog....");

		try {
			JSONParser jp = new JSONParser();

			JSONObject blogOb = (JSONObject) jp.parse(body);

			System.out.println(blogOb);

			Blog b = new Blog();

			b.setId(blogOb.get("id").toString());

			bdao.delete(b);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>("{\"msg\": \"Failure\"}", HttpStatus.OK);
		}

		return new ResponseEntity<String>("{\"msg\": \"Success\"}", HttpStatus.OK);
	}

	/*----------------------------------------------FETCH ALL BLOGS -----------------------------------------------*/
	/*-------------------------FETCH ALL BLOGS --------------------------*/

	@RequestMapping(value = "/fetchAllBlogs", method = RequestMethod.GET)
	public ResponseEntity<String> fetchAllBlogs() {
		System.out.println("fetchAllBlogs");

		ObjectMapper blogMapper = new ObjectMapper();

		try {
			System.out.println(blogMapper.writeValueAsString(bdao.findAll()));

			return new ResponseEntity<String>(blogMapper.writeValueAsString(bdao.findAll()), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>("{\"msg\": \"Failure\"}", HttpStatus.OK);

		}

	}

	/*---------------------------------------------ADD BLOGS ---------------------------------------------*/
	/*-------------------------ADD BLOGS --------------------------*/

	@RequestMapping(value = "/addBlog", method = RequestMethod.POST)
	public ResponseEntity<String> addBlog(@RequestBody String body) {
		System.out.println("Adding Blog....");

		try {
			JSONParser jp = new JSONParser();

			JSONObject blogOb = (JSONObject) jp.parse(body);

			System.out.println(blogOb);

			Blog b = new Blog();

			if (blogOb.get("email") != null)
				b.setOwnerId(blogOb.get("email").toString());
			if (blogOb.get("title") != null)
				b.setTitle(blogOb.get("title").toString());
			if (blogOb.get("description") != null)
				b.setDescription(blogOb.get("description").toString());
			b.setDate(new Date().toString());

			bdao.create(b);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>("{\"msg\": \"Failure\"}", HttpStatus.OK);
		}

		return new ResponseEntity<String>("{\"msg\": \"Success\"}", HttpStatus.OK);
	}

	/*----------------------------------------------EDIT BLOGS --------------------------------------------------*/
	/*-------------------------EDIT BLOGS --------------------------*/

	@RequestMapping(value = "/editBlog", method = RequestMethod.POST)
	public ResponseEntity<String> editBlog(@RequestBody String body) {
		System.out.println("Editing Blog.....");

		try {
			JSONParser jp = new JSONParser();

			JSONObject joObject = (JSONObject) jp.parse(body);

			System.out.println(joObject);

			Blog j = new Blog();

			j.setId(joObject.get("id").toString());

			System.out.println(joObject.get("id").toString());

			j = bdao.find(j);

			j.setDate(new Date().toString());

			j.setTitle(joObject.get("Title").toString());
			j.setDescription(joObject.get("Description").toString());

			bdao.update(j);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>("{\"msg\": \"Failure\"}", HttpStatus.OK);
		}

		return new ResponseEntity<String>("{\"msg\": \"Success\"}", HttpStatus.OK);
	}

	/*-------------------------------------------------------------------------------------------------------*/

	/*-----------------------------------------FETCH ALL FORUMS-------------------------------------------*/

	@RequestMapping(value = "/fetchAllForums", method = RequestMethod.GET)
	public ResponseEntity<String> fetchAllForums() {
		System.out.println("fetchAllForums");

		ObjectMapper mapper = new ObjectMapper();

		try {
			System.out.println(mapper.writeValueAsString(fdao.findAll()));

			return new ResponseEntity<String>(mapper.writeValueAsString(fdao.findAll()), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>("{\"msg\": \"Failure\"}", HttpStatus.OK);

		}

	}

	/*-----------------------------------------------ADD FORUMS-------------------------------------------------*/

	@RequestMapping(value = "/addForum", method = RequestMethod.POST)
	public ResponseEntity<String> AddForum(@RequestBody String body) {
		System.out.println("Adding Forum.....");

		try {
			JSONParser jp = new JSONParser();

			JSONObject joObject = (JSONObject) jp.parse(body);

			System.out.println(joObject);

			Forum b = new Forum();

			if (joObject.get("email") != null)
				b.setOwnerId(joObject.get("email").toString());
			if (joObject.get("title") != null)
				b.setTitle(joObject.get("title").toString());
			if (joObject.get("description") != null)
				b.setDescription(joObject.get("description").toString());
			if (joObject.get("category") != null)
				b.setCategory(joObject.get("category").toString());
			b.setDate(new Date().toString());

			fdao.create(b);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>("{\"msg\": \"Failure\"}", HttpStatus.OK);
		}

		return new ResponseEntity<String>("{\"msg\": \"Success\"}", HttpStatus.OK);
	}

	/*-----------------------------------------------EDIT FORUM------------------------------------------------------*/

	@RequestMapping(value = "/editForum", method = RequestMethod.POST)
	public ResponseEntity<String> editForum(@RequestBody String body) {
		System.out.println("Editing Forum.....");

		try {
			JSONParser jp = new JSONParser();

			JSONObject joObject = (JSONObject) jp.parse(body);

			System.out.println(joObject);

			Forum j = new Forum();

			j.setId(joObject.get("id").toString());

			System.out.println(joObject.get("id").toString());

			j = fdao.find(j);

			j.setDate(new Date().toString());

			j.setTitle(joObject.get("Title").toString());
			j.setDescription(joObject.get("Description").toString());

			fdao.update(j);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>("{\"msg\": \"Failure\"}", HttpStatus.OK);
		}

		return new ResponseEntity<String>("{\"msg\": \"Success\"}", HttpStatus.OK);
	}

	/*-------------------------------------------------DELETE FORUM---------------------------------------------------*/

	@RequestMapping(value = "/deleteForum", method = RequestMethod.POST)
	public ResponseEntity<String> deleteForum(@RequestBody String body) {
		System.out.println("Deleting Forum.....");

		try {
			JSONParser jp = new JSONParser();

			JSONObject joObject = (JSONObject) jp.parse(body);

			System.out.println(joObject);

			Forum j = new Forum();

			j.setId(joObject.get("id").toString());

			fdao.delete(j);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>("{\"msg\": \"Failure\"}", HttpStatus.OK);
		}

		return new ResponseEntity<String>("{\"msg\": \"Success\"}", HttpStatus.OK);
	}

	/*--------------------------------------------FETCH ALL USERS-----------------------------------------------*/

	@RequestMapping(value = "/fetchAllUsers", method = RequestMethod.GET)
	public ResponseEntity<String> fetchAllUsers() {
		System.out.println("fetchAllUsers");

		ObjectMapper mapper = new ObjectMapper();

		try {
			System.out.println(mapper.writeValueAsString(udao.findAll()));

			return new ResponseEntity<String>(mapper.writeValueAsString(udao.findAll()), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>(new JSONObject().put("msg", "ERROR").toString(), HttpStatus.OK);

		}

	}

	/*-----------------------------------------------FETCH ALL ONLINERS---------------------------------------------*/

	@RequestMapping(value = "/fetchAllOnliners", method = RequestMethod.GET)
	public ResponseEntity<String> fetchAllOnliners(HttpServletRequest req) {
		System.out.println("fetchAllOnliners");

		String myemail = req.getParameter("myemail");

		try {

			JSONArray jarr = new JSONArray();

			for (String email : WebSocketServer.sessionMap.keySet()) {
				if (!myemail.equals(email))
					jarr.add(email);
			}

			return new ResponseEntity<String>(jarr.toJSONString(), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>(new JSONObject().put("msg", "ERROR").toString(), HttpStatus.OK);

		}

	}

	/*-----------------------------------------------ADD USERS---------------------------------------------*/

	@RequestMapping(value = "/addUser", method = RequestMethod.POST)
	public ResponseEntity<String> addUser(@RequestBody String body) {
		System.out.println("Adding Users...");

		try {
			JSONParser jp = new JSONParser();

			JSONObject joObject = (JSONObject) jp.parse(body);

			System.out.println(joObject);

			Users u = new Users();

			if (joObject.get("Username") != null)
				u.setUsername(joObject.get("Username").toString());
			if (joObject.get("Email") != null)
				u.setEmail(joObject.get("Email").toString());
			if (joObject.get("Password") != null)
				u.setPassword(joObject.get("Password").toString());
			if (joObject.get("Phone") != null)
				u.setPhone(joObject.get("Phone").toString());
			if (joObject.get("Gender") != null)
				u.setGender(joObject.get("Gender").toString());

			u.setProfilePicUrl(u.getGender().equals("Male") ? "resources/images/male.png" : "resources/images/female.png");

			udao.create(u);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>("{\"msg\": \"Failure\"}", HttpStatus.OK);
		}

		return new ResponseEntity<String>("{\"msg\": \"Success\"}", HttpStatus.OK);
	}

	@RequestMapping(value = "/getAllUsersExceptMe", method = RequestMethod.POST)
	public ResponseEntity<String> getAllUsersExceptMe(@RequestBody String body) {
		System.out.println("getAllUsersExceptMe.....");

		try {
			JSONParser jp = new JSONParser();

			JSONObject joObject = (JSONObject) jp.parse(body);

			System.out.println(joObject);

			String myEmail = joObject.get("myemail").toString();

			List<Users> list = new ArrayList<Users>();

			for (Users u : udao.findAll()) {
				if (!u.getEmail().equals(myEmail)) {
					list.add(u);
				}
			}

			ObjectMapper mapper = new ObjectMapper();

			System.out.println(mapper.writeValueAsString(list));

			System.out.println("{\"msg\": \"Success\",\"list\":" + mapper.writeValueAsString(list) + "}");

			return new ResponseEntity<String>("{\"msg\": \"Success\",\"list\":" + mapper.writeValueAsString(list) + "}",
					HttpStatus.OK);

		} catch (Exception e) 
		{
			e.printStackTrace();
			return new ResponseEntity<String>("{\"msg\": \"Failure\"}", HttpStatus.OK);
		}

	}

	/*-----------------------------------------------DELETE JOB----------------------------------------------*/

	@RequestMapping(value = "/deleteJob", method = RequestMethod.POST)
	public ResponseEntity<String> deleteJob(@RequestBody String body) {
		System.out.println("Deleting Job.....");

		try {
			JSONParser jp = new JSONParser();

			JSONObject joObject = (JSONObject) jp.parse(body);

			System.out.println(joObject);

			Job j = new Job();

			j.setId(joObject.get("id").toString());

			jdao.delete(j);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>("{\"msg\": \"Failure\"}", HttpStatus.OK);
		}

		return new ResponseEntity<String>("{\"msg\": \"Success\"}", HttpStatus.OK);
	}

	/*-----------------------------------------------FETCH ALL JOBS----------------------------------------------*/

	@RequestMapping(value = "/fetchAllJobs", method = RequestMethod.GET)
	public ResponseEntity<String> fetchAllJobs() {
		System.out.println("fetchAllJobs");

		ObjectMapper mapper = new ObjectMapper();

		try {
			System.out.println(mapper.writeValueAsString(jdao.findAll()));

			return new ResponseEntity<String>(mapper.writeValueAsString(jdao.findAll()), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>("{\"msg\": \"Failure\"}", HttpStatus.OK);

		}

	}

	/*---------------------------------------------FETCH ALL FRIENDS---------------------------------------------*/

	@RequestMapping(value = "/fetchAllFriends", method = RequestMethod.GET)
	public ResponseEntity<String> fetchAllFriends() {
		System.out.println("fetchAllFriends");

		ObjectMapper mapper = new ObjectMapper();

		try {
			System.out.println(mapper.writeValueAsString(udao.findAll()));

			return new ResponseEntity<String>(mapper.writeValueAsString(udao.findAll()), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>("{\"msg\": \"Failure\"}", HttpStatus.OK);

		}
	}

	/*----------------------------------------------------ADD FRIENDS-----------------------------------------------*/

	@RequestMapping(value = "/addFriend", method = RequestMethod.POST)
	public ResponseEntity<String> addFriend(@RequestBody String body) {
		System.out.println("Adding Friend");

		try {
			JSONParser jp = new JSONParser();

			JSONObject frObject = (JSONObject) jp.parse(body);

			// System.out.println(frObject);
			//
			// Users u = new Users();
			// u.setEmail(frObject.get("alphaEmail").toString());
			// u = udao.find(u);
			// List<String> reqout = u.getRequestsOut();
			// reqout.add(frObject.get("omegaEmail").toString());
			// u.setRequestsOut(reqout);
			// udao.update(u);
			//
			// u = new Users();
			// u.setEmail(frObject.get("omegaEmail").toString());
			// u = udao.find(u);
			// List<String> reqin = u.getRequestsIn();
			// reqin.add(frObject.get("alphaEmail").toString());
			// u.setRequestsIn(reqin);
			// udao.update(u);

			String sourceEmail = frObject.get("alphaEmail").toString();
			String targetEmail = frObject.get("omegaEmail").toString();
			
			Users u = new Users();u.setEmail(sourceEmail);
			Users sourceUser = udao.find( u );
			
			u = new Users();u.setEmail(targetEmail);
			Users targetUser = udao.find( u );
			
			System.out.println("Source Email: " + sourceEmail);
			System.out.println("Target Email: " + targetEmail);
			
			System.out.println("Source User: " + sourceUser);
			System.out.println("Target User: " + targetUser);
			
			List<String> list = sourceUser.getRequestsOut();
			
			if(!list.contains( targetEmail )) {
				list.add(targetEmail);
				
				sourceUser.setRequestsOut(list);
				udao.update(sourceUser);
			}
			
			list = targetUser.getRequestsIn();
			
			if(!list.contains( sourceEmail )) {
				list.add(sourceEmail);
				
				targetUser.setRequestsIn(list);
				udao.update(targetUser);
			}
			
			System.out.println("Post Update:");
			System.out.println("Source User: " + sourceUser);
			System.out.println("Target User: " + targetUser);
			
			return new ResponseEntity<String>("{\"msg\": \"Success\"}", HttpStatus.OK);
			
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>("{\"msg\": \"Failure\"}", HttpStatus.OK);
		}
		
	}

	/*-------------------------------------------------------UN-FRIEND-----------------------------------------------------------*/

	@RequestMapping(value = "/unFriend", method = RequestMethod.POST)
	public ResponseEntity<String> unFriend(@RequestBody String body) {
		System.out.println("Unfriending Friend.....");

		try {
			JSONParser jp = new JSONParser();

			JSONObject unfrndObject = (JSONObject) jp.parse(body);

			System.out.println(unfrndObject);

			Users u = new Users();
			u.setEmail(unfrndObject.get("alphaEmail").toString());
			u = udao.find(u);

			List<String> f = u.getFriends();
			f.remove(unfrndObject.get("omegaEmail").toString());
			udao.update(u);

			u = new Users();
			u.setEmail(unfrndObject.get("omegaEmail").toString());
			u = udao.find(u);

			f = u.getFriends();
			f.remove(unfrndObject.get("alphaEmail").toString());
			udao.update(u);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>("{\"msg\": \"Failure\"}", HttpStatus.OK);
		}

		return new ResponseEntity<String>("{\"msg\": \"Success\"}", HttpStatus.OK);
	}

	/*-------------------------UNDO FRIEND--------------------------------*/
	
	@RequestMapping(value="/undoFriend",method=RequestMethod.POST)
	public ResponseEntity<String> undoFriend( @RequestBody String body  )
	{
		System.out.println("Undo Friend Request...");
		
		try
		{
			JSONParser jp = new JSONParser();
			
			JSONObject joObject = (JSONObject)jp.parse(body);
		
			System.out.println(joObject);
		
			Users u = new Users();
			u.setEmail(joObject.get("alphaEmail").toString());
			u = udao.find(u);
			List<String> ro = u.getRequestsOut();
			ro.remove(joObject.get("omegaEmail").toString());
			u.setRequestsOut(ro);
			udao.update(u);
			
			u = new Users();
			u.setEmail(joObject.get("alphaEmail").toString());
			u = udao.find(u);
			List<String> r = u.getRequestsIn();
			r.remove(joObject.get("omegaEmail").toString());
			u.setRequestsIn(r);
			udao.update(u);
			
		}
		catch( Exception e )
		{
			e.printStackTrace();
			return new ResponseEntity<String>("{\"msg\": \"Failure\"}", HttpStatus.OK);
		}
		
		return new ResponseEntity<String>("{\"msg\": \"Success\"}", HttpStatus.OK);
	}
	/*----------------------------------ACCEPT FRIEND---------------------------------*/
	
	@RequestMapping(value = "/acceptFriend", method = RequestMethod.POST)
	public ResponseEntity<String> acceptFriend(@RequestBody String body) {
		System.out.println("Accepting Friend....");

		try {
			JSONParser jp = new JSONParser();

			JSONObject joObject = (JSONObject) jp.parse(body);

			System.out.println(joObject);

			Users u = new Users();
			u.setEmail(joObject.get("alphaEmail").toString());
			u = udao.find(u);
			List<String> ro = u.getRequestsOut();
			ro.remove(joObject.get("omegaEmail").toString());
			u.setRequestsOut(ro);

			List<String> re = u.getRequestsIn();
			re.remove(joObject.get("omegaEmail").toString());
			u.setRequestsIn(re);

			List<String> fr = u.getFriends();
			fr.add(joObject.get("omegaEmail").toString());
			udao.update(u);

			u = new Users();
			u.setEmail(joObject.get("omegaEmail").toString());
			u = udao.find(u);

			ro = u.getRequestsOut();
			ro.remove(joObject.get("alphaEmail").toString());
			u.setRequestsOut(ro);

			re = u.getRequestsIn();
			re.remove(joObject.get("alphaEmail").toString());
			u.setRequestsIn(re);

			fr = u.getFriends();
			fr.add(joObject.get("alphaEmail").toString());
			udao.update(u);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>("{\"msg\": \"Failure\"}", HttpStatus.OK);
		}

		return new ResponseEntity<String>("{\"msg\": \"Success\"}", HttpStatus.OK);
	}

	/*----------------------------ADD JOB----------------------*/

	@RequestMapping(value = "/addJob", method = RequestMethod.POST)
	public ResponseEntity<String> addJob(@RequestBody String body) {
		System.out.println("Adding Job...");
		try {
			JSONParser jp = new JSONParser();

			JSONObject jobObject = (JSONObject) jp.parse(body);

			System.out.println(jobObject);

			Job j = new Job();

			if (jobObject.get("email") != null)
				j.setOwnerId(jobObject.get("email").toString());
			if (jobObject.get("title") != null)
				j.setTitle(jobObject.get("title").toString());
			if (jobObject.get("description") != null)
				j.setDescription(jobObject.get("description").toString());
			j.setDate(new Date().toString());

			jdao.create(j);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>("{\"msg\": \"Failure\"}", HttpStatus.OK);
		}

		return new ResponseEntity<String>("{\"msg\": \"Success\"}", HttpStatus.OK);
	}

	/*---------------------------APPLY JOB------------------------*/

	@RequestMapping(value = "/applyJob", method = RequestMethod.POST)
	public ResponseEntity<String> applyJob(@RequestBody String body) {
		System.out.println("Applying Job.......");

		try {
			JSONParser jsonp = new JSONParser();

			JSONObject jobObject = (JSONObject) jsonp.parse(body);

			System.out.println(jobObject);

			Job j = new Job();
			j.setId(jobObject.get("id").toString());

			j = jdao.find(j);

			List<String> app = j.getApplicants();
			app.add(jobObject.get("Email").toString());

			j.setApplicants(app);

			jdao.update(j);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>("{\"msg\": \"Failure\"}", HttpStatus.OK);
		}

		return new ResponseEntity<String>("{\"msg\": \"Success\"}", HttpStatus.OK);
	}

	/*-----------------------------EDIT JOB--------------------------------*/

	@RequestMapping(value = "/editJob", method = RequestMethod.POST)
	public ResponseEntity<String> editJob(@RequestBody String body) {
		System.out.println("Editing Job...");

		try {
			JSONParser jp = new JSONParser();

			JSONObject jobObject = (JSONObject) jp.parse(body);

			System.out.println(jobObject);

			Job j = new Job();

			j.setId(jobObject.get("id").toString());

			j = jdao.find(j);

			j.setDate(new Date().toString());

			if (jobObject.get("title") != null)
				j.setTitle(jobObject.get("title").toString());
			if (jobObject.get("description") != null)
				j.setDescription(jobObject.get("description").toString());

			jdao.update(j);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>("{\"msg\": \"Failure\"}", HttpStatus.OK);
		}

		return new ResponseEntity<String>("{\"msg\": \"Success\"}", HttpStatus.OK);
	}

}
