package com.kregos.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.kregos.model.Job;

@Repository("JobDAO")
@Qualifier("JobDAO")
@Component
public class JobDAOImpl implements JobDAO {

	@Autowired
	MongoTemplate mongoTemplate;

	public JobDAOImpl() {
		super();
		System.out.println("Implementing JobDAO.....");
	}

	final String COLLECTION = "k_jobs";

	public void create(Job job) {
		mongoTemplate.insert(job);
	}

	public void update(Job job) {
		mongoTemplate.save(job);
	}

	public void delete(Job job) {
		System.out.println(job.getId());

		Query query = new Query(Criteria.where("_id").is(job.getId()));

		mongoTemplate.remove(query, job.getClass());

	}

	public void deleteAll() {
		mongoTemplate.remove(new Query(), COLLECTION);
	}

	public Job find(Job job) {
		Query query = new Query(Criteria.where("_id").is(job.getId()));
		return mongoTemplate.findOne(query, Job.class, COLLECTION);
	}

	public List<Job> findAll() {
		return (List<Job>) mongoTemplate.findAll(Job.class);
	}

}
