package com.kregos.configuration;

import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.fasterxml.jackson.databind.ObjectMapper;

@ServerEndpoint("/chat")
public class WebSocketServer {

	private static Set<Session> sessionList = new HashSet<Session>();
	public static Map<String, Session> sessionMap = new HashMap<String, Session>();

	@OnOpen
	public void open(Session session) {
		System.out.println("Session Connected");
		System.out.println(session);

		sessionList.add(session);

		for (Session s : sessionList) {

			System.out.println(s);

		}

	}

	@OnClose
	public void close(Session session) {
		System.out.println("Session disconnected, " + session);

		sessionList.remove(session);

		for (Map.Entry<String, Session> s : sessionMap.entrySet()) {

			if (s.getValue().equals(session)) {
				sessionMap.remove(s.getKey());

				for (Session s1 : sessionList) {

					if (s1.isOpen() && !s1.equals(session))
						try {
							s1.getBasicRemote().sendText("disconnect:" + s.getKey());
						} catch (Exception e) {
							e.printStackTrace();
						}

				}
			}

		}

		System.out.println(sessionMap);

	}

	@OnMessage
	public void handleMessage(String message, Session session) throws IOException {
		System.out.println(message);
		System.out.println("From Session: " + session);

		JSONParser jparr = new JSONParser();

		try {

			JSONObject jobj = (JSONObject) jparr.parse(message);

			String msg = jobj.get("msg").toString();

			if (msg.startsWith("connect")) {
				String email = msg.split(":")[1];

				if (!sessionMap.containsValue(session)) {
					sessionMap.put(email, session);

					System.out.println("New Connection established");

					System.out.println("Session Map:");

					System.out.println(sessionMap);

					for (Session s1 : sessionList) {

						if (s1.isOpen() && !s1.equals(session))
							try {
								s1.getBasicRemote().sendText("connect:" + email);
							} catch (Exception e) {
								e.printStackTrace();
							}

					}
					
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		for (Session s : sessionList) {

			if (s.isOpen() && !s.equals(session))
				s.getBasicRemote().sendText(message);

		}
	}

}
