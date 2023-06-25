package com.capstone.project.model;

import com.capstone.project.dto.StudySetResponse;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Set;


@NamedNativeQuery(
        name = "StudySetResponseCustomList",
        query = "SELECT s.id, s.title, s.description, s.is_deleted, s.is_public, s.is_draft, s.type_id, s.author_id, s.deleted_date, " +
                "(SELECT COUNT(*) FROM capstone.card WHERE studyset_id = s.id) AS count FROM studyset s " +
                "WHERE s.is_deleted = :isDeleted AND s.is_public = :isPublic AND s.is_draft = :isDraft",
        resultSetMapping = "StudySetResponseCustomListMapping"
)
@SqlResultSetMapping(
        name = "StudySetResponseCustomListMapping",
        classes = @ConstructorResult(
                targetClass = StudySetResponse.class,
                columns = {
                        @ColumnResult(name = "id", type = Integer.class),
                        @ColumnResult(name = "title", type = String.class),
                        @ColumnResult(name = "description", type = String.class),
                        @ColumnResult(name = "is_deleted", type = Boolean.class),
                        @ColumnResult(name = "is_public", type = Boolean.class),
                        @ColumnResult(name = "is_draft", type = Boolean.class),
                        @ColumnResult(name = "type_id", type = Integer.class),
                        @ColumnResult(name = "author_id", type = Integer.class),
                        @ColumnResult(name = "deleted_date", type = Date.class),
                        @ColumnResult(name = "count", type = Integer.class)
                }
        )
)

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "studyset")
public class StudySet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "author_id", nullable = false)
    private User user;

    private String title;

    private String description;

    private boolean is_deleted; // delete 1 or not 0

    private boolean is_public; // public 1 or private 0

    private boolean is_draft; // draft 1 or not 0

    @ManyToOne
    @JoinColumn(name = "type_id", nullable = false)
    private StudySetType studySetType;

    @ManyToMany(mappedBy = "studySets")
    Set<Class> classes;

    @Column
    @Temporal(TemporalType.DATE)
    private Date deleted_date;


}
