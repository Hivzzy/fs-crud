package com.crud.api.controller;

import com.crud.api.model.Employee;
import com.crud.api.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @PostMapping
    public Employee createEmployee(@RequestBody Employee employee) {
        return employeeRepository.save(employee);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails) {
        Optional<Employee> employee = employeeRepository.findById(id);
        if (employee.isPresent()) {
            Employee updateEmployee = employee.get();
            updateEmployee.setName(employeeDetails.getName());
            updateEmployee.setReligion(employeeDetails.getReligion());
            updateEmployee.setAddress(employeeDetails.getAddress());
            updateEmployee.setCity(employeeDetails.getCity());
            updateEmployee.setAge(employeeDetails.getAge());
            employeeRepository.save(updateEmployee);
            return ResponseEntity.ok(updateEmployee);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        Optional<Employee> employee = employeeRepository.findById(id);
        return employee.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        Optional<Employee> employee = employeeRepository.findById(id);
        if (employee.isPresent()) {
            employeeRepository.delete(employee.get());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/batch")
    public ResponseEntity<List<Employee>> batchCreateOrUpdateEmployees(@RequestBody List<Employee> employees) {
        for (Employee employee : employees) {
            if (employee.getId() != null) {
                Optional<Employee> existingEmployee = employeeRepository.findById(employee.getId());
                if (existingEmployee.isPresent()) {
                    Employee updatedEmployee = existingEmployee.get();
                    if (!employee.equals(updatedEmployee)) {
                        updatedEmployee.setName(employee.getName());
                        updatedEmployee.setReligion(employee.getReligion());
                        updatedEmployee.setAddress(employee.getAddress());
                        updatedEmployee.setCity(employee.getCity());
                        updatedEmployee.setAge(employee.getAge());
                        employeeRepository.save(updatedEmployee);
                    }
                } else {
                    employeeRepository.save(employee);
                }
            } else {
                employeeRepository.save(employee);
            }
        }
        return ResponseEntity.ok(employeeRepository.findAll());
    }
}
