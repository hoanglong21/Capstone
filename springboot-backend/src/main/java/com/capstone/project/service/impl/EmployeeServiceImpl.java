package com.capstone.project.service.impl;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Employee;
import com.capstone.project.repository.EmployeeRepository;
import com.capstone.project.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }
    // autowired auto-inject suitable bean

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

    @Override
    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public Employee getEmployeeById(Long id) {
        Employee employee = null;
        try {
            employee = employeeRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Employee not exist with id :" + id));
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
        }
        return employee;
    }

    @Override
    public Employee updateEmployee(Long id, Employee employeeDetails) {
        Employee employee = null;
        try {
            employee = employeeRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Employee not exist with id :" + id));
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
        }
        employee.setFirstName(employeeDetails.getFirstName());
        employee.setLastName(employeeDetails.getLastName());
        employee.setEmailId(employeeDetails.getEmailId());

        Employee updateEmployee = employeeRepository.save(employee);
        return updateEmployee;
    }

    @Override
    public Boolean deleteEmployee(Long id) {
        Employee employee;
        try {
            employee = employeeRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Employee not exist with id :" + id));
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
            return false;
        }
        employeeRepository.delete(employee);
        return true;
    }

    @Override
    public ResponseEntity<Map<String, Object>> getAllEmployeesFilterAndPagination(String id, int page, int size) {
        try {
            List<Employee> employees = new ArrayList<>();
            Pageable paging = PageRequest.of(page, size);

            Page<Employee> pageEmployees;
            if(id == null)
                pageEmployees = employeeRepository.findAll(paging);
            else
                pageEmployees = employeeRepository.findById(id, paging);

            employees = pageEmployees.getContent();

            Map<String, Object> response = new HashMap<>();
            response.put("employees", employees);
            response.put("currentPage", pageEmployees.getNumber());
            response.put("totalItems", pageEmployees.getTotalElements());
            response.put("totalPages", pageEmployees.getTotalPages());

            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
