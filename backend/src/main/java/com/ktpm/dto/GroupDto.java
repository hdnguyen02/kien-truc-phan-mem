package com.ktpm.dto;

import com.ktpm.entity.Group;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class GroupDto {
    private Long id;
    private UserDto owner;
    private String name;

    private String description;

    public static GroupDto mapToGroupDto(Group group){
        GroupDto groupDto = new GroupDto();
        groupDto.setId(group.getId());
        groupDto.setName(group.getName());
        groupDto.setOwner(new UserDto(group.getOwner()));
        groupDto.setDescription(groupDto.getDescription());

        return  groupDto;
    }

}
