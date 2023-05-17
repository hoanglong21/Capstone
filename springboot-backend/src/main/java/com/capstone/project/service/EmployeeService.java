package com.capstone.project.service;

import com.capstone.project.model.Employee;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface EmployeeService {
    List<Employee> getAllEmployees();

    Employee createEmployee( Employee employee);

    Employee getEmployeeById( Long id);

    Employee updateEmployee( Long id, Employee employeeDetails);

    Boolean deleteEmployee(Long id);

    ResponseEntity<Map<String, Object>> getAllEmployeesFilterAndPagination(String id, int page, int size);

}
