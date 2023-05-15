package com.capstone.project.controller;

import com.capstone.project.model.Employee;
import com.capstone.project.repository.EmployeeRepository;
import com.capstone.project.exception.ResourceNotFroundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//@CrossOrigin(origins = "http://localhost:3000")
//for cloud
@CrossOrigin(origins = "https://capstone-g13.vercel.app")
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {

    private final EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeController(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }
    // autowired auto-inject suitable bean

    //get all employees
    @GetMapping("/employees")
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

    //create employee rest api
    @PostMapping("/employees")
    public Employee createEmployee(@RequestBody Employee employee) {
        return employeeRepository.save(employee);
    }

    //get employee by id rest api
    @GetMapping("/employees/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) throws ResourceNotFroundException {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("Employee not exist with id :" + id));
        return ResponseEntity.ok(employee);
    }

    //update employee rest api
    @PutMapping("/employees/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id,@RequestBody Employee employeeDetails) throws ResourceNotFroundException {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("Employee not exist with id :" + id));
        employee.setFirstName(employeeDetails.getFirstName());
        employee.setLastName(employeeDetails.getLastName());
        employee.setEmailId(employeeDetails.getEmailId());

        Employee updateEmployee = employeeRepository.save(employee);
        return ResponseEntity.ok(updateEmployee);
    }

    // delete employee rest api
    @DeleteMapping("/employees/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id) throws ResourceNotFroundException {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("Employee not exist with id :" + id));

        employeeRepository.delete(employee);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    // get with filter and pagination
    @GetMapping("/employeesWithSearch")
    public ResponseEntity<Map<String, Object>> getAllEmployeesFilterAndPagination(@RequestParam(required = false) String id,
                                                             @RequestParam(defaultValue = "0") int page,
                                                             @RequestParam(defaultValue = "3") int size) {
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
